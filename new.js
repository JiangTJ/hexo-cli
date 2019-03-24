/**
 * hexo x name
 */
module.exports = function(args){
  console.log(args);
  let config = hexo.config.jiang || {};
  args.path = config.post_base_dir + '/' + args._[0];
  this.call('new',args);
};
