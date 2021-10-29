import moment from 'moment';
import { Chore } from '../../data/data';
import { labelCaseChoreSlider } from './ChoresSlider';

export default function displayChore(data: labelCaseChoreSlider, chore: Chore) {
    const today = moment(new Date()).format('YYYY-MM-DD');
    const lastDoneDate = chore.lastDone
        ? moment(new Date(chore.lastDone)).format('YYYY-MM-DD')
        : moment(new Date(chore.createdDate)).format('YYYY-MM-DD');

    const doneNextByDate = moment(lastDoneDate).add(chore.frequency, 'day').format('YYYY-MM-DD');

    const differenceInDays = (new Date(today).getTime() - new Date(doneNextByDate).getTime()) / (1000 * 3600 * 24);

    switch (data) {
    case 'All':
        return true;

    case 'Today':
        if (differenceInDays >= 0) return true;
        else return false;

    case 'Week':
        if (doneNextByDate >= moment().startOf('isoWeek').format('YYYY-MM-DD') &&
        doneNextByDate <= moment().endOf('isoWeek').format('YYYY-MM-DD') || differenceInDays > 0) {
            return true;
        } else return false;

    case 'Month':
        if (doneNextByDate >= moment().startOf('month').format('YYYY-MM-DD') &&
        doneNextByDate <= moment().endOf('month').format('YYYY-MM-DD') || differenceInDays > 0) {
            return true;
        }
        break;
    }
}