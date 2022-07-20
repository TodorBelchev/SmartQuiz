import IQuestion from "./IQuestion";

export default interface IAddQuiz {
    id?: number;
    title: string;
    duration: number;
    creator: number;
    category: string;
    questions?: IQuestion[];
}