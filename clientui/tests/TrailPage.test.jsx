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



test('displays Trial Complete! message when trial is complete', async () => {
    useParams.mockReturnValue({id: '1'});
    useLocation.mockReturnValue({search: '?maxTrials=3&numberOfCards=3'});
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

    
    
    await waitFor(() => {
        for (let i = 1; i < 4; i++) {
            const correctStimuliCard = screen.getByTestId(`stimuliCard-${i}`);
            fireEvent.click(correctStimuliCard);
        }

        expect(screen.getByText('Trial Complete!')).toBeInTheDocument();
    });
})