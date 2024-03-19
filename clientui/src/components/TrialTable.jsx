import Table from 'react-bootstrap/Table';

const TrialTable = ({trial}) => {
    const date = new Date(trial?.date);

    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });

    const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    });

    return (
        <Table striped="columns" bordered hover>
            <thead>
                <tr>
                    
                    <th>Stimuli Set: </th>
                    <th className='text-center'>{trial.stimSet?.title}</th>
                    <th>{formattedDate} {formattedTime}</th>
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