import React from "react";
import {render, screen, fireEvent } from "@testing-library/react";
import TrialPage from "../src/pages/TrialPage";
import { useParams, useLocation } from "react-router-dom";
import { MemoryRouter } from "react-router-dom";
import { getOneStimSet, getStimSetsStimuli } from "../src/API/StimSetApi";
import { waitFor } from "@testing-library/dom";
import toBeInTheDocument from "@testing-library/jest-dom";


jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useParams: jest.fn(),
    useLocation: jest.fn()
}));

jest.mock("../src/API/StimSetApi", () => ({
    getOneStimSet: jest.fn(),
    getStimSetsStimuli: jest.fn()
}));


describe("trialPage", () => {
    test('renders trial page component', () => {
        <MemoryRouter>
            <TrialPage />
        </MemoryRouter>
    })
})

test('correctly displays the number of stimuli on the screen from user input', async () => {
    useLocation.mockReturnValue({search: '?maxTrials=3&numberOfCards=3'});
    getOneStimSet.mockResolvedValue({id:1, title: 'test 1'});
        getOneStimSet.mockResolvedValue([
            {id: '1', image: 'test1.png', stimName: 'Test 1'},
            {id: '2', image: 'test2.png', stimName: 'Test 2'},
            {id: '3', image: 'test3.png', stimName: 'Test 3'}
        ])
    render(
        <MemoryRouter>
            <TrialPage />
        </MemoryRouter>
    );

    await waitFor(() => {
        const stimuliCards = screen.getAllByRole('button', { name: /Test/i });
        expect(stimuliCards.length).toBe(3); // Assuming the user input is 3
    });
})

test('displays Trial Complete! message when trial is complete', async () => {
    useParams.mockReturnValue({id: '1'});
    // dont think i need client
    useLocation.mockReturnValue({search: '?maxTrials=3&numberOfCards=3&client=1'});
    getOneStimSet.mockResolvedValue({id: '1', title: 'Test set'});
        getStimSetsStimuli.mockResolvedValue([
            {id: '1', image: 'test1.png', stimName: 'Test 1'},
            {id: '2', image: 'test2.png', stimName: 'Test 2'},
            {id: '3', image: 'test3.png', stimName: 'Test 3'}
        ]);

    render(
        <MemoryRouter>
            <TrialPage />
        </MemoryRouter>
    );

    for (let i = 0; i < 3; i++) {
        const correctStimuliCard = await screen.findByAltText(`Test ${i + 1}`);
        fireEvent.click(correctStimuliCard);

    }
    
    await waitFor(() => {
        expect(screen.getByText('Trial Complete!')).toBeInTheDocument();
    });
})