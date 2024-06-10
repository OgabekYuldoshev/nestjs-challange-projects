export declare namespace IStore {
  export interface Store {
    isAuthenticated: boolean;
    accessToken: string;
    profile: IEntity.Profile | null;
  }
}
export declare namespace IApi {
  export namespace Login {
    export interface Req {
      body: IForm.LoginForm;
    }

    export interface Res {
      data: {
        access_token: string;
      };
    }
  }
}

export declare namespace IEntity {
  export interface Profile {
    address: string;
    country: string;
    email: string;
    name: string;
    phone: string;
    _id: string;
  }
}

export declare namespace IForm {
  export interface LoginForm {
    email: string;
    password: string;
  }
}
