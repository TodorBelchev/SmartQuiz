import IQuestion from "./IQuestion";

export default interface IQuizState {
    quiz: {
        id: number | undefined;
        title: string | undefined;
        duration: number | undefined;
        creator: number | undefined;
        category: { name: string } | undefined;
        questions: IQuestion[];
    },
    selectedResponses: { questionId: number, responseId: number }[];
}