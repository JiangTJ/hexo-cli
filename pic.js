const imagemin = require('imagemin');
const imageminWebp = require('imagemin-webp');
const fs = require('fs');
var path = require('path');

function webpAllPic(root) {
    fs.readdir(root, {
        withFileTypes: true
    }, function (err, files) {
        if (err) {
            console.error(err);
            return;
        }
        //console.log(files);
        files.forEach(item => {
            let temp = path.join(root, item.name);
            if (item.isFile()) {
                let pic = new RegExp('(.jpeg|.png|.jpg)$', 'gi');
                if (pic.test(item.name)) {
                    //console.error(temp);
                    imagemin([temp], root, {
                        use: [imageminWebp({ quality: 75 })]
                    }).then(() => {
                        console.log('Images optimized: ' + temp);
                    });
                }
            } else {
                webpAllPic(temp);
            }
        });
    });
}

function cleanPic(root) {
    fs.readdir(root, {
        withFileTypes: true
    }, function (err, files) {
        if (err) {
            console.error(err);
            return;
        }
        files.forEach(item => {
            let temp = path.join(root, item.name);
            if (item.isFile()) {
                let pic = new RegExp('(.jpeg|.png|.jpg)$', 'gi');
                if (pic.test(item.name)) {
                    let end = temp.lastIndexOf('.');
                    fs.exists(temp.substring(0, end) + '.webp', (exists) => {
                        if (exists) {
                            fs.unlink(temp, (err) => {
                                if (err) throw err;
                                console.log('Deleted: ' + temp);
                            });
                        } else {
                            console.warn('webp not exist: ' + temp);
                        }
                    });
                }
            } else {
                cleanPic(temp);
            }
        });
    });
}

module.exports = function (args) {
    console.log(args);
    let config = hexo.config.jiang || {};
    let path = "";

    // all
    if (args.a || args.all) {
        webpAllPic('source/_posts');
        return;
    }

    // clean
    if (args.c || args.clean) {
        cleanPic('source/_posts');
        return;
    }

    // images dir
    if (args.images) {
        path = 'source/images';
    }

    // post path
    if (args._[0]) {
        if (config.post_base_dir) {
            path = 'source/_posts/' + config.post_base_dir + '/' + args._[0];
        } else {
            path = 'source/_posts/' + args._[0];
        }
    }

    // custom path
    if (args.path) {
        path = args.path;
    }

    // custom type
    let type = '/*';
    if (args.type) {
        type = `/*.{${args.type}}`;
    }

    if (!path) {
        console.log('路径不能为空！')
        return this.call('help', {_: ['webp']});
    }

    //webp
    imagemin([path + type], path, {
        use: [
            imageminWebp({ quality: 75 })
        ]
    }).then(() => {
        console.log('Images optimized');
    });

};
