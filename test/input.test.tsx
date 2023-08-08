import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { Input } from './src/app/home/input'
import { Providers } from '@/__redux/provider'

describe('Input for new topics', () => {
    it ('Should render button properly', () => {
        render(<Providers><Input /></Providers>);

        const button = screen.getByRole('button');
        const buttonText = 'Create';

        expect(button).toHaveTextContent(buttonText)
    })
})