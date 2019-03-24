/**
 * 这里是我需要用到的hexo命令行
 * 
 * Hexo Config
 * jiang:
 *   post_base_dir:
 * 
 */
hexo.extend.console.register('x', '在指定路径创建文件', {
    arguments: [
        { name: 'title', desc: '标题名' }
    ]
}, require('./new'));

hexo.extend.console.register('pic', '压缩，转换图片格式', {
    arguments: [
        { name: 'path', desc: '压缩路径（相对于_post）' }
    ],
    options: [
      {name: '-a, --all', desc: '转换所有`source/_post`下的图片至webp格式'},
      {name: '-c, --clean', desc: '删除所有`source/_post`下已转换的图片'},
      {name: '--images', desc: '转换`source/images`下的图片至webp格式'},
      {name: '--path', desc: '自定义路径（完整）'}
    ]
}, require('./pic'));

hexo.extend.console.register('infox', 'infox', {
}, function (args) {
    console.error(args);
});
