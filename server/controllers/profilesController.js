import profiles from '../database/profiles';
import validation from './validationLibrary';

class profilesController{
    //Get all profiles
    static getAllProfiles(req,res){
        return res.status(200).json({
            profiles,
            message: "All the profiles",
        });
    }

    //Get a single profile
    static getSingleProfile(req,res){

        if (!validation.validateNumber(req.params.id))
            return res.status(400).json({message: "Please specify a number in the parameters list"})

        const findProfile = profiles.find(profile => profile.id === parseInt(req.params.id, 10));

        if (findProfile){
            return res.status(200).json({
                profile: findProfile,
                message: "A single profile record",
            })
        }

        return res.status(404).json({
            message: "profile not found",
        })
    }


    //Update a single profile
    static updateSingleProfile(req,res){
        if (!validation.validateNumber(req.params.id))
            return res.status(400).json({message: "Please specify a number in the parameters list"})


        if (!req.body.firstname || !req.body.lastname || !req.body.role){
            return res.status(400).json({
                message: 'A required detail is missing: Try again. Profile not created',
            });
        }
        const id = parseInt(req.params.id,10);

        let profileFound, itemIndex;

        profiles.map((profile,index) => {
            if (profile.id === id){
                profileFound = profile;
                itemIndex = index;
            }
        });

        if (!profileFound){
            return res.status(404).send({
                success: 'false',
                message: 'profile not found',
            });
        }

        const updatedProfile = {
            id: profileFound.id,
            product_id: profileFound.product_id,
            title: req.body.title || profileFound.title,
            image: req.body.image || profileFound.image,
            description: req.body.description || profileFound.description,
            price: req.body.price || profileFound.price,
            quantity: req.body.quantity || profileFound.quantity
        };

        profiles.splice(itemIndex, 1, updatedProfile);

        return res.status(200).json({
            updatedProduct: updatedProfile,
            message: "profile updated Successfully",
        })
    }


    // Delete a single profile
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
        if (!req.body.firstname || !req.body.lastname || !req.body.role){
            return res.status(400).json({
                message: 'A required detail is missing: Either names or role. Try again. Profile not created',
            });
        }

        const new_profile = {
            id: profiles.length + 1,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            role: req.body.role,
            image: req.body.image || 'images/default_profile.png'
        };

        profiles.push(new_profile);

        return res.status(201).json({
            new_profile: new_profile,
            message: "profile created Successfully",
        })
    }
}

export default profilesController;