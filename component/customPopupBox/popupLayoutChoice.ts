import { useAppSelector } from '../../store/store';

let modalTitle = '';
let ModalLeft = '';
let modalRight = '';
let modalPlaceholder = '';
let modalInputActive = true;
let avatar = false;

export function LayoutChoice(modalCase: string, id?: string) {
    const username = useAppSelector(state => state.member.memberList.find(m => m.userId === id))?.memberName;

    if (modalCase === 'JH') {
        modalTitle = 'Gå med i Hushåll';
        ModalLeft = 'Gå med';
        modalRight = 'Avbryt';
        modalPlaceholder = 'Hushållskod';
        modalInputActive = true;
        avatar = false;
    } else if (modalCase === 'CH') {
        modalTitle = 'Skapa Hushåll';
        ModalLeft = 'Skapa';
        modalRight = 'Avbryt';
        modalPlaceholder = 'Namn';
        modalInputActive = true;
        avatar = false;
    } else if (modalCase === 'MO') {
        modalTitle = 'Gör till ägare';
        ModalLeft = 'Acceptera';
        modalRight = 'Avbryt';
        modalPlaceholder = 'Gör ' + username + ' till ägare';
        modalInputActive = false;
        avatar = false;
    } else if (modalCase === 'RUFH') {
        modalTitle = 'Ta bort från hushåll';
        ModalLeft = 'Ja';
        modalRight = 'Avbryt';
        modalPlaceholder = 'Vill du verkligen ta bort ' + username + '?';
        modalInputActive = false;
        avatar = false;
    } else if (modalCase === 'AR') {
        modalTitle = 'Besvara förfrågan';
        ModalLeft = 'Acceptera';
        modalRight = 'Avslå';
        modalPlaceholder = username + ' vill gå med';
        modalInputActive = false;
        avatar = false;
    } else if (modalCase === 'AI') {
        modalTitle = 'Välj avatar';
        avatar = true;
    } else {
        modalTitle = 'Ajdå, här blev det fel';
        modalRight = 'Tillbaka';
    }
    return { modalTitle, ModalLeft, modalRight, modalPlaceholder, modalInputActive, avatar };
}