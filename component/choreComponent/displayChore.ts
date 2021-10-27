import moment from 'moment';
import { Chore } from '../../data/data';
import { displayChoreSelection } from './ChoresSlider';

export default function displayChore(data: displayChoreSelection, chore: Chore) {
    const today = moment(new Date()).format('YYYY-MM-DD');
    const lastDoneDate = chore.lastDone
        ? moment(new Date(chore.lastDone)).format('YYYY-MM-DD')
        : moment(new Date(chore.createdDate)).format('YYYY-MM-DD');

    const doneNextByDate = moment(lastDoneDate).add(chore.frequency, 'day').format('YYYY-MM-DD');

    const differenceInDays = (new Date(today).getTime() - new Date(doneNextByDate).getTime()) / (1000 * 3600 * 24);

    switch (data) {
    case 'Alla':
        console.log('Alla');
        return true;

    case 'Idag':
        // Case will return chores that will be done today or is late
        moment().format('YYYY-MM-DD');
        console.log('Idag', moment().format('YYYY-MM-DD'));
        break;

    case 'Denna vecka':
        // moment().endOf('isoWeek').format('YYYY-MM-DD');
        if (doneNextByDate >= moment().startOf('isoWeek').format('YYYY-MM-DD') &&
        doneNextByDate <= moment().endOf('isoWeek').format('YYYY-MM-DD') || differenceInDays > 0) {
            console.log(chore.name);
            // console.log('Denna vecka start', moment().startOf('isoWeek').format('YYYY-MM-DD'));
            // console.log('Denna vecka slut', moment().endOf('isoWeek').format('YYYY-MM-DD'));
            return true;
        }
        break;

    case 'Denna månad':
        // moment().endOf('month').format('YYYY-MM-DD');
        if (doneNextByDate >= moment().startOf('month').format('YYYY-MM-DD') &&
        doneNextByDate <= moment().endOf('month').format('YYYY-MM-DD') || differenceInDays > 0) {
            console.log(chore.name);
        }
        // console.log('Denna månad start', moment().startOf('month').format('YYYY-MM-DD'));
        // console.log('Denna månad slut', moment().endOf('month').format('YYYY-MM-DD'));
        break;
    }
}