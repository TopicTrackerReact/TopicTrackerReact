import React from 'react';
import { render, screen } from '@testing-library/react';
import "@testing-library/jest-dom";
import { AllTasks } from '@/app/allTasks'
import { Providers } from '@/_redux/provider'

describe('Should render a new button with proper text content', () => {
    render(<Providers><AllTasks /></Providers>);
    
})