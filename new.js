'use strict';

function createNewPost(args,hexo){
  let config = hexo.config.jiang || {};
  if (!config.post_base_dir) {
    console.warn('需要配置jiang.post_base_dir!')
    hexo.call('help', {_:['x']})
    return;
  }
  args.path = config.post_base_dir + '/' + args._[0];
  hexo.call('new',args);
};

module.exports = createNewPost;
