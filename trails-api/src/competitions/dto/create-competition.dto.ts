export class CreateCompetitionDto {
    designation: string;
    type: 'BTT' | 'Trail' ;
    date: Date;
    time: Date;
    entity: string;
}
