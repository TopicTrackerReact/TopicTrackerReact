import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import "@testing-library/jest-dom";

// IMPORTS FOR TESTING
import { Input } from '@/app/home/input';
import { AllTasks } from '@/app/home/allTasks';
import { Providers } from '@/_redux/provider'

const MockTaskPage = () => {
    return (
        <Providers>
            <Input />
            <AllTasks />
        </Providers>
    )
}

describe('Input for new topics', () => {

    let inputElement: HTMLElement;
    let button: HTMLElement;

    beforeEach(() => {
        
        // Render component
        render(<MockTaskPage />);

        // Assign input and add button element
        inputElement = screen.getByPlaceholderText('Add Topic');
        button = screen.getByTestId('input-test');
    });

    it ('Should create a new button with proper text', () => {

        // SIMULATE BUTTON CLICK
        fireEvent.change(inputElement, { target: { value: 'React'}})
        fireEvent.click(button)

        // Check to see if a new element has been rendered
        const newButton = screen.getByTestId('button-test')
        expect(newButton).toBeInTheDocument()
        expect(newButton).toHaveTextContent('REACT')
    })
    it ('Should not render the same button twice', () => {

        // SIMULATE FIRST TASK ENTRY
        fireEvent.change(inputElement, { target: { value: 'React'}})
        fireEvent.click(button)

        // SIMULATE DUPLICATE TASK ENTRY
        fireEvent.change(inputElement, { target: { value: 'React'}})
        fireEvent.click(button)

        // Check to see that a new element has NOT been rendered
        const allButtons = screen.getAllByTestId('button-test')
        expect(allButtons.length).toBe(1)
    })
    it ('Should render multiple buttons properly', () => {

        // ADD MULTIPLE NEW BUTTONS
        const tasks: string[] = ['React', 'Hooks', 'Auth'];
        tasks.forEach((el: string) => {
            fireEvent.change(inputElement, { target: { value: el }});
            fireEvent.click(button)
        })
        const allTasks = screen.getAllByTestId('button-test');
        expect(allTasks.length).toBe(3)
    })
})
