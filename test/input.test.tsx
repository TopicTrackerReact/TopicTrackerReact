import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { Input } from '@/app/input'
import { Providers } from '@/redux/provider'

describe('Input for new topics', () => {
    it ('Should render button properly', () => {
        render(<Providers><Input /></Providers>);

        const button = screen.getByRole('button');
        const buttonText = 'Create';

        expect(button).toHaveTextContent(buttonText)
    })
})