
export default interface IQuestion {
    text: string;
    correctResponse: string;
    responses: { text: string }[];
}