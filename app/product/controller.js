const path = require('path');
const fs = require('fs');
const config = require('../config');
const Product = require('./model');

const store = async(req, res, next) => {
    try{
        let payload = req.body;
        console.log(payload)
        if(req.file){
            let tmpPath = req.file.path;
            let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
            let fileName = req.file.filename + '.' + originalExt;
            let targetPath = path.resolve(config.rootPath, `public/images/product/${fileName}`);

            const src = fs.createReadStream(tmpPath);
            const dest = fs.createWriteStream(targetPath);
            src.pipe(dest);

            src.on('end', async () => {
                try{
                    let product = new Product({...payload, image_url: fileName})
                    await product.save();
                    return res.json(product);
                }catch(err){
                    fs.unlinkSync(targetPath);
                    if(err && err.name == 'Validation Error'){
                        return res.json({
                            error: 1,
                            message: err.message,
                            fields: err.errors
                        })
                    }
                    next(err);
                }
            });
            src.on('error', async() => {
                next(err);
            })
        }else{
            let product = new Product(payload);
            await product.save();
            return res.json(product);
        }
    }catch(err){
        if(err && err.name === 'Validation Error'){
            return res.json({
                error:1,
                message: err.message,
                fields: err.fields
                })
            }
        next(err);
    }
}

module.exports = {
    store
}