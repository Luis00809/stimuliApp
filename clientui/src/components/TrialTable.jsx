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
                    
                    <th colSpan={2} className='text-center'>Stimuli Set: <span className='text-primary'>{trial.stimSet?.title}</span> </th>
                    <th>Date: <span className='textColor'>{formattedDate}</span> </th>

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
                    <td >Total Correct: {trial.totalCorrect} out of {trial.totalTrials}</td>
                    <td >Cards on screen: {trial.cardsOnScreen}</td>
                    <td>Time: <span className='textColor'>{formattedTime}</span> </td>
                </tr>
            </tfoot>
        </Table>
    );
}

export default TrialTable;