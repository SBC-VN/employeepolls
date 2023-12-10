import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import User from './User';

let userInfo = {
    id: "sarahedo",
    name: "Sarah Edo",
    avatarURL: "../../images/snow.jpg",
    answers: {
        "8xf0y6ziyjabvozdd253nd": "optionOne",
        "6ni6ok3ym7mf1p33lnez": "optionOne",
        "am8ehyc8byjqgar0jgpub9": "optionTwo",
        "loxhs1bqm25b708cmbf3g": "optionTwo"
    },
    questions: ["8xf0y6ziyjabvozdd253nd", "6ni6ok3ym7mf1p33lnez"]
};

describe('User tests', () => {
    test('renders user row', () => {
        render(<User user={userInfo} />);
        screen.debug();
    });

    test('Snapshot test', () => {
        let component = render(<User user={userInfo} />);
        expect(component).toMatchSnapshot(); 
    });

    test('User info displays correctly', () => {
        let component = render(<User user={userInfo} />);
        expect(component.getByText("Sarah Edo")).toBeInTheDocument();
        expect(component.getByText("sarahedo")).toBeInTheDocument();
    });

    test('Answer/Quesion count displays correctly', () => {
        let component = render(<User user={userInfo} />);
        expect(component.getByTestId("answer-output")).toHaveTextContent("4");
        expect(component.getByTestId("question-output")).toHaveTextContent("2");
    });
});