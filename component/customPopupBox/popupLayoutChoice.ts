import { useAppSelector } from '../../store/store';
import { getUserByIdSelector } from '../../store/user/userSelector';

let modalTitle = '';
let modalLeft = '';
let modalRight = '';
let modalPlaceholder = '';
let modalSecondaryPlaceholder = '';
let modalInputActive = true;
let avatar = false;

export function LayoutChoice(modalCase: string, id?: string) {
    const user = useAppSelector((state) => getUserByIdSelector(state));

    if (modalCase === 'JH') {
        modalTitle = 'Gå med i Hushåll';
        modalLeft = 'Gå med';
        modalRight = 'Avbryt';
        modalPlaceholder = 'Hushållskod';
        modalSecondaryPlaceholder = 'Användarnamn';
        modalInputActive = true;
        avatar = false;
    } else if (modalCase === 'CH') {
        modalTitle = 'Skapa Hushåll';
        modalLeft = 'Skapa';
        modalRight = 'Avbryt';
        modalPlaceholder = 'Hushållsnamn';
        modalSecondaryPlaceholder = 'Användarnamn';
        modalInputActive = true;
        avatar = false;
    } else if (modalCase === 'MO') {
        modalTitle = 'Gör till ägare';
        modalLeft = 'Acceptera';
        modalRight = 'Avbryt';
        modalPlaceholder = 'Gör ' + user?.username + ' till ägare';
        modalInputActive = false;
        avatar = false;
    } else if (modalCase === 'RUFH') {
        modalTitle = 'Ta bort från hushåll';
        modalLeft = 'Ja';
        modalRight = 'Avbryt';
        modalPlaceholder = 'Vill du verkligen ta bort ' + user?.username + '?';
        modalInputActive = false;
        avatar = false;
    } else if (modalCase === 'AR') {
        modalTitle = 'Besvara förfrågan';
        modalLeft = 'Acceptera';
        modalRight = 'Avslå';
        modalPlaceholder = user?.username + ' vill gå med';
        modalInputActive = false;
        avatar = false;
    } else if (modalCase === 'AI') {
        modalTitle = 'Välj avatar';
        avatar = true;
    }
    return { modalTitle, modalLeft, modalRight, modalPlaceholder, modalInputActive, avatar, modalSecondaryPlaceholder };
}
