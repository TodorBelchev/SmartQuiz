import IQuestion from "./IQuestion";

export default interface IQuiz {
    id?: number;
    title: string;
    duration: number;
    creator: number;
    category: string;
    questions: IQuestion[];
}