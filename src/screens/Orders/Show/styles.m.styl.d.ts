declare namespace StylesMStylNamespace {
  export interface IStylesMStyl {
    backButtonWrapper: string;
    body: string;
    content: string;
    head: string;
    name: string;
    orderInfo: string;
    orderProp: string;
    propName: string;
    row: string;
    screen: string;
    screenWrapper: string;
    table: string;
    title: string;
  }
}

declare const StylesMStylModule: StylesMStylNamespace.IStylesMStyl & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: StylesMStylNamespace.IStylesMStyl;
};

export = StylesMStylModule;
