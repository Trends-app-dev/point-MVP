import React from "react";
import { HiAcademicCap, HiBriefcase, HiChat, HiUser } from "react-icons/hi";
import { MdGroupAdd } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "../../../../../hooks/useMediaQuery";
import { createNewPrivateChat } from "../../../../../redux/chatSlice";
import { selectDarkMode } from "../../../../../redux/uiSlice";
import { selectUserProfile } from "../../../../../redux/usersSlice";
import { Avatar } from "../../../../chat/components/main";

export const FeedCard = ({ user, handleAddToGroup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectUserProfile);
  const isSmallerThan650 = useMediaQuery("(max-width: 650px)");
  const darkMode = useSelector(selectDarkMode);
  const lightColor = "#232323";
  const darkColor = "#FFF";

  const handleProfile = () => {
    navigate(`/user/profile/${user.user.id}`);
  };
  const handleChats = () => {
    dispatch(createNewPrivateChat(currentUser.id, user.user.id));
    navigate("/chatroom/chat");
  };

  return (
    <div className="card rounded-lg flex flex-row bg-white dark:bg-[#383636] m-10 cursor-default shadow-md max-md:flex-col items-center">
      <div
        className="relative inline-block cursor-pointer select-none m-6 h-32 w-32"
        onClick={handleProfile}
      >
        <Avatar
          imageUrl={user.user.profile_image}
          altText={user.user.name}
          status={user.user.status}
          type={"feed"}
        />
      </div>

      <div className="card_profile w-[85%] text-left ml-[1vw] pb-4">
        <div className="name_icons flex flex-row items-center justify-between gap-[1vw] mt-2 max-sm:flex-col max-sm:mt-0">
          <div className="name_type flex items-center max-md:flex-col max-md:items-start">
            <h1
              className="font-[Rubik] font-medium text-lg text-left px-4 text-blue-300 cursor-pointer hover:text-blue-500 dark:text-white mt-0 mb-0 pb-0 max-sm:text-center"
              onClick={handleProfile}
            >
              {user.user.name}
            </h1>

            {user.user.type === "student" ? (
              <>
                <HiAcademicCap
                  className="icon w-5 h-5 m-[1rem] flex-none max-md:hidden"
                  color={darkMode ? darkColor : lightColor}
                  title="Estudiante"
                />
                <span className="user_type italic text-[#777] pl-4 hidden max-md:block">
                  Estudiante
                </span>
              </>
            ) : (
              <>
                <HiBriefcase
                  className="icon w-5 h-5 m-[1rem] flex-none max-md:hidden"
                  color={darkMode ? darkColor : lightColor}
                  title="Profesional"
                />
                <span className="user_type italic text-[#777] pl-4 hidden max-md:block">
                  Profesional
                </span>
              </>
            )}
          </div>

          <div className="card_buttons p-0 m-0">
            <button onClick={handleProfile} title="Ver perfil">
              <HiUser
                size={isSmallerThan650 ? 25 : 20}
                className="icon w-5 h-5 m-[1rem] flex-none"
                color={darkMode ? darkColor : lightColor}
              />
            </button>

            <button onClick={handleChats} title="Iniciar chat">
              <HiChat
                size={isSmallerThan650 ? 25 : 20}
                className="icon w-5 h-5 m-[1rem] flex-none"
                color={darkMode ? darkColor : lightColor}
              />
            </button>

            <button
              onClick={() => handleAddToGroup(user.user.id)}
              title="Agregar a grupo"
            >
              <MdGroupAdd
                size={isSmallerThan650 ? 25 : 20}
                className="icon w-5 h-5 m-[1rem] flex-none"
                color={darkMode ? darkColor : lightColor}
              />
            </button>
          </div>
        </div>

        <div className="info_container flex flex-col">
          <h3 className="subtitle font-[Rubik] text-base font-bold text-left px-4 my-2 text-gray-800 dark:text-[#d9d9d9]">
            {user.user.info_skills
              ? user.user.info_skills.join(" | ")
              : user.user.info_interests[0]}
            {user.user.profile_city || user.user.profile_country ? (
              <p className="font-normal italic text-gray-700 dark:text-[#999]">
                {`${user.user.profile_city}, ${user.user.profile_country}`}{" "}
              </p>
            ) : null}
          </h3>
          <h3 className="bio_container leading-5 font-[Rubik] text-base text-left px-4 my-2 text-gray-800 dark:text-[#d9d9d9]">
            {user.user.profile_bio}
          </h3>
        </div>
      </div>
    </div>
  );
};
