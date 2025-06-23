export class CreateUserDto {
    username: string;
    password: string;
    role: 'admin'|'participant';
}
