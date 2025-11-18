export interface Usuario {
    idUsuario?: number;
    usuario: string;
    nombre: string;
    correo: string;
    apellidoMaterno: string;
    apellidoPaterno: string;
    password: string;
    fechaNacimiento: Date | string;
    recaptchaToken?: string;
}

export interface UsuarioToken{
    usuario: string;
    correo: string;
    token: string;
    idUsuario : number;
}