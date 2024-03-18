import Table from 'react-bootstrap/Table';

const TrialTable = ({trial}) => {
    return (
        <Table striped bordered hover>
            <thead>
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
                    <td>Cards on screen: {trial.cardsOnScreen}</td>
                </tr>
            </tfoot>
        </Table>
    );
}

export default TrialTable;