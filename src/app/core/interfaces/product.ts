import { Category } from './category';

export interface Product {
  productName: string;
  productSubTitle: any;
  shortDescription: any;
  description: any;
  productDetail: string;
  acessories: string;
  airMessage: any;
  waterMessage: any;
  models: string;
  image1: string;
  image2: string;
  specSheettTitle: string;
  specSheetFilename: string;
  installationTitle: any;
  installationFilename: string;
  category: Category;
  childProducts?: Product[];
  parentProduct?: ParentProduct;
  id: number;
  companyCode: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface ParentProduct {
  productName: string;
  id: number;
  companyCode: string;
}
