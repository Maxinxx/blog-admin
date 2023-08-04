interface MenuModel {
  description: string;
  route: string;
}

export enum ModelType {
  User = 0,
  Article = 1,
  Comment = 2,
  CreateArticle = 3,
}

const MenuUser: MenuModel = {
  route: '/user',
  description: '用户',
};

const MenuArticle: MenuModel = {
  route: '/article',
  description: '文章',
};

const MenuComment: MenuModel = {
  route: '/comment',
  description: '评论',
};

const MenuCreateArticle: MenuModel = {
  route: '/post',
  description: '发文',
};

export { MenuModel, MenuUser, MenuArticle, MenuComment, MenuCreateArticle };
