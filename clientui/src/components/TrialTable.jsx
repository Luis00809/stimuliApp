import Table from 'react-bootstrap/Table';

const TrialTable = ({trial}) => {
    return (
        <Table striped="columns" bordered hover>
            <thead>
                <tr>
                    
                    <th>Stimuli Set: </th>
                    <th colSpan={3} className='text-center'>{trial.stimSet?.title}</th>
                </tr>
                <tr>
                    <th>Round #</th>
                    <th>Target</th>
                    <th>Answer</th>
                </tr>
            </thead>
            <tbody>
                {trial.rounds?.map((round, index) => (
                    <tr key={round.id}>
                        <td>{round.roundNumber}</td>
                        <td>{round.target}</td>
                        <td>{round.answer}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={2}>Total Correct: {trial.totalCorrect} out of {trial.totalTrials}</td>
                    <td colSpan={2}>Cards on screen: {trial.cardsOnScreen}</td>
                </tr>
            </tfoot>
        </Table>
    );
}

export default TrialTable;