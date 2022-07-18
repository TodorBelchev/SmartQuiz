
export default interface IQuestion {
    id?: string;
    text: string;
    correctResponse: string;
    responses: { id?: string; text: string }[];
}