import { useAppSelector } from '../../store/store';

let modalTitle = '';
let modalLeft = '';
let modalRight = '';
let modalPlaceholder = '';
let modalSecondaryPlaceholder = '';
let modalInputActive = true;
let avatar = false;

export function LayoutChoice(modalCase: string, id?: string) {
    const username = useAppSelector(state => state.member.memberList.find(m => m.userId === id))?.memberName;
    const currentHousehold = useAppSelector((state) => state.household.householdList.find(h => h.id === state.household.currentHouseholdId));

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
        modalPlaceholder = 'Gör ' + username + ' till ägare';
        modalInputActive = false;
        avatar = false;
    } else if (modalCase === 'RUFH') {
        modalTitle = 'Ta bort från hushåll';
        modalLeft = 'Ja';
        modalRight = 'Avbryt';
        modalPlaceholder = 'Vill du verkligen ta bort ' + username + '?';
        modalInputActive = false;
        avatar = false;
    } else if (modalCase === 'AR') {
        modalTitle = 'Besvara förfrågan';
        modalLeft = 'Acceptera';
        modalRight = 'Avslå';
        modalPlaceholder = username + ' vill gå med';
        modalInputActive = false;
        avatar = false;
    } else if (modalCase === 'CHN') {
        modalTitle = 'Byt Hushållsnamn';
        modalLeft = 'Byt namn';
        modalRight = 'Avbryt';
        modalPlaceholder = currentHousehold!.name;
        modalInputActive = true;
        avatar = false;
    } else if (modalCase === 'AI') {
        modalTitle = 'Välj avatar';
        avatar = true;
    } else {
        modalTitle = 'Ajdå, här blev det fel';
        modalRight = 'Tillbaka';
    }
    return { modalTitle, modalLeft, modalRight, modalPlaceholder, modalInputActive, avatar, modalSecondaryPlaceholder };
}
