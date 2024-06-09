
export declare namespace IApi {
  export namespace Login {
    export interface Req {
      body: IForm.LoginForm
    }

    export interface Res {
      data: any
    }
  }
}

export declare namespace IEntity {
  export interface Profile {
    email: string,
  }
}

export declare namespace IForm {
  export interface LoginForm {
    email: string,
    password: string
  }
}