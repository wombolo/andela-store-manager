import profiles from '../database/profiles';
import validation from './validationLibrary';

class profilesController{
    //Get all profiles
    static getAllProfiles(req,resp,next){
        profiles.query('SELECT * FROM profiles', (err, res) => {
            if (err)
                return next(err);

            return resp.status(200).json({
                profiles: res.rows,
                message: "All the profiles"
            })
        });
    }

    //Get a single profile
    static getSingleProfile(req,resp,next){
        if (!validation.validateNumber(req.params.id))
            return resp.status(400).json({message: "Please specify a number in the parameters list"});

        profiles.query('SELECT * FROM profiles WHERE id = $1', [req.params.id], (err, res) => {
            if (err)
                return next(err);

            //If any record is found... Else
            if (res.rows.length > 0) {
                return resp.status(200).json({
                    profile: res.rows[0],
                    message: "A single profile record",
                })
            }

            else {
                return resp.status(404).json({message: "profile not found",})
            }
        });
    }


    //Update a single profile
    static updateSingleProfile(req,resp,next){
        if (!validation.validateNumber(req.params.id))
            return res.status(400).json({message: "Please specify a number in the parameters list"})


        if (!req.body.firstname || !req.body.lastname || !req.body.role){
            return resp.status(400).json({message: 'A required detail is missing: Try again. Profile not updated',});
        }


        const id = parseInt(req.params.id,10);
        let profileFound, itemIndex;



        profiles.query('SELECT * FROM profiles WHERE id = $1', [id], (err, res) => {
            if (err)
                return next(err);

            profileFound = res.rows[0];
            itemIndex = res.rows[0].id;


            if (!profileFound){
                return resp.status(404).send({message: 'profile not found',});
            }

            const updatedProfile = {
                id: profileFound.id,
                firstname: req.body.firstname || profileFound.firstname,
                lastname: req.body.lastname || profileFound.lastname,
                email: req.body.email || profileFound.email,
                role: req.body.role || profileFound.role,
                image: req.body.image || profileFound.image,
                password: req.body.password || profileFound.password
            };


            let {firstname,lastname,email, role,image,password } = updatedProfile;


            //Update profile
            profiles.query('UPDATE profiles SET (firstname, lastname, email, role,image,password) = ($1,$2,$3,$4,$5,$6) WHERE id = $7 RETURNING *',
                [firstname, lastname,email, role, image, password , req.params.id], (err, res) => {
                if (err)
                    return next(err);

                return resp.status(200).json({
                    updatedProfile: res.rows[0],
                    message: "profile updated Successfully",
                })
            });
        });
    }


    // Delete a single profile.
    // *************************CONFIRMATION REQUIRED**************************
    static deleteSingleProfile(req,res){

        if (!validation.validateNumber(req.params.id))
            return res.status(400).json({message: "Please specify a number in the parameters list"})


        const id = parseInt(req.params.id,10);
        let profilesRemaining;

        profiles.map((profile,index) => {
            if (profile.id === id){
                profiles.splice(index,1);
                profilesRemaining = profile;
            }
        });

        if (profilesRemaining){
            return res.status(200).json({
                profile: profilesRemaining,
                message: 'profile deleted',
            });
        }

        return res.status(404).json({
            message: "profile not found",
        })
    }


    //Create a single profile
    static addNewProfile(req,res){
        if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password){
            return res.status(400).json({
                message: 'A required detail is missing: Either names or role. Try again. Profile not created',
            });
        }

        const new_profile = {
            id: profiles.length + 1,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            role: req.body.role || 'store_attendant',
            image: req.body.image || 'images/default_profile.png',
            password: "12345"
        };

        let {firstname,lastname,email, role,image,password } = new_profile;


        //Create profile
        profiles.query('INSERT INTO profiles (firstname, lastname,email, role,image,password) VALUES ($1,$2,$3,$4,$5, $6) RETURNING *',
            [firstname, lastname,email, role, image, password], (err, res) => {
                if (err)
                    return next(err);

                return res.status(201).json({
                    new_profile: new_profile,
                    message: "profile created Successfully",
                })
            });
    }

}

export default profilesController;