const profiles = require('../database/profiles');

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
        if (!req.body.title || !req.body.description || !req.body.price || !req.body.quantity){
            return res.status(400).json({
                message: 'A required detail is missing: title, description, price or quantity. profile not created',
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
        const id = parseInt(req.params.id,10);
        let deleted;

        profiles.map((profile,index) => {
            if (profile.id === id){
                profiles.splice(index,1);
                deleted = profile;
            }
        });

        if (deleted){
            return res.status(200).json({
                profile: deleted,
                message: 'profile deleted',
            });
        }

        return res.status(404).json({
            message: "profile not found",
        })
    }


    //Create a single profile
    static addNewProfile(req,res){
        if (!req.body.title || !req.body.description || !req.body.price || !req.body.quantity){
            return res.status(400).json({
                message: 'A required detail is missing: title, description, price or quantity. profile not created',
            });
        }

        const new_product = {
            id: profiles.length + 1,
            product_id: req.body.product_id,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            quantity: req.body.quantity
        };

        profiles.push(new_product);

        return res.status(201).json({
            new_product,
            message: "profile created Successfully",
        })
    }
}

module.exports = profilesController;