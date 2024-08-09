export function prescription(profile, token = ""){
    return(
        <header className="absolute top-0 right-0">{profile.first_name} {profile.last_name}</header>
    );
}