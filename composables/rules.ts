export const useFormRules = () => {
	return {
		ruleRequired: (v: any) => !!v || "Ce champ est réquis",
		required: (v: any) => !!v || "Ce champ est réquis",
		ruleEmail: (value: any) => {
			const pattern =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return pattern.test(value) || "Enter a valid email";
		},
		rulePassLen: (v: string) => (!!v && v.length >= 6) || "Password must be 6 chars or more",
		email: (value: any) => {
			const pattern =
				/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return pattern.test(value) || "Cet email n'est pas valide";
		},
        requiredMin:(value:any) => value <= 1000000 || 'La valeur ne peut pas depassée 1000000',
        requiredMax: (value:any) => value >= 1 || 'Insérer une valeur supérieur ou égale à 1',
        emails: (value: any) =>
          validateEmails(value) || 'Un ou plusieurs adresse email invalide',
        requiredCheckMultiple: (value:any) =>
          /^(?!\s*$).+$/.test(value) || 'Ce champ est obligatoire',
        string: (value:any) =>
          /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\| A-Za-z0-9]+/g.test(
            value
          ) || 'Ce champ doit être une chaîne de caractère',
        number: (value:any) =>
          /^([0-9])$/.test(value) || 'Ce champ doit être un entier',
        numbers: (value:any) => !isNaN(value) || 'Ce champ doit être un nombre',
        password: (value:any) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          ) ||
          'Le mot de passe doit contenir \n au minimum 8 caractères,\n au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial',
        matchingPasswords: (value:any, value2:any) =>
          value.match(value2)
            ? true
            : 'Les mots de passe ne sont pas identiques',
        picture: (value:any) =>
          !value ||
          value.size < 5000000 ||
          "La taille de l'image doit être moins de 5 MB!",
	};
	function validateEmails(value:any) {
		const emails = value ? value.split(",") : []
		let hashInvalidEmail = false
		if (emails.length) {
		  hashInvalidEmail = !emails.find(
			(v:any) =>
			  !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,8})$/.test(v)
		  )
		}
		return hashInvalidEmail
	  }
};
