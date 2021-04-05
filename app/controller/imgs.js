'use strict';

const BaseController = require('./base');
const path = require('path');
const fs = require('fs')
const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');
class ImgsController extends BaseController {
    async upload() {
        const { ctx } = this;
        // file not required
        const stream = await ctx.getFileStream({ requireFile: false });
        const filename = Date.now() + path.extname(stream.filename).toLocaleLowerCase();
        const target = path.join('app/public/uploads', filename);
        const writeStream = fs.createWriteStream(target);
        try {
            //异步把文件流 写入
            await awaitWriteStream(stream.pipe(writeStream));
        } catch (err) {
            //如果出现错误，关闭管道
            await sendToWormhole(stream);
            // 自定义方法
            this.error(err);
        }
        const result = await ctx.service.img.insertImg({
            filename: filename.toString(),
            url: '/public/uploads/' + filename
        })
        // 自定义方法
        this.success({
            url: '/public/uploads/' + filename,
            result
        });

    }
    async getAll() {
        const { ctx } = this;
        const result = await ctx.service.img.getImages();
        ctx.body = {
            data: result.url,
        };
    }
}

module.exports = ImgsController;
