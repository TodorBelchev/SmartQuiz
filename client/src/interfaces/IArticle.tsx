import ISection from "./ISection";

export default interface IArticle {
    id?: number;
    title: string;
    subTitle?: string;
    sections: ISection[];
}