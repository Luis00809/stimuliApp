import Table from 'react-bootstrap/Table';


const ResultTable = ({ trials }) => {
    const totalTrials = trials.length;
    const totalCorrect = trials.filter(trial => trial.correct).length;

    return (
        <Table striped="columns">
            <thead>
                <tr>
                    <th>Trial Number</th>
                    <th>Target</th>
                    <th>Result</th>
                </tr>
            </thead>
            <tbody>
                {trials.map((trial, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{trial.target}</td>
                        <td>{trial.correct ? 'Correct' : 'Incorrect'}</td>
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={2}>Total Correct:</td>
                    <td>{totalCorrect} out of {totalTrials}</td>
                </tr>
            </tfoot>
        </Table>
    );
}

export default ResultTable;