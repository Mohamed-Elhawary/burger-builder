import { 
    AiFillLinkedin, 
    AiFillGithub, 
    AiFillCodepenCircle, 
    AiFillBehanceCircle 
} from "react-icons/ai";
import signature from "../../assets/images/signature.png";
import classes from './Footer.module.css';

const Footer = () => {
    return (
      	<footer className={classes.Footer}>
			<div>
                All Rights reserved &copy; {new Date().getFullYear()}, <a href="https://github.com/Mohamed-Elhawary/burger-builder" target="_blank">Burger Builder</a> {/* eslint-disable-line */}
                <p className={classes.Author}>
                    <div>
                        Made by: 
                        <a href="https://www.linkedin.com/in/mohamed-elhawary14/" target="_blank"> {/* eslint-disable-line */} 
                            <img src={signature} alt="signature" width="100" height="40" />
                        </a>
                    </div>
                </p> 
                <ul className={classes.Social}>
                    <li className="mr-3"><a href="https://www.linkedin.com/in/mohamed-elhawary14/" target="_blank"><AiFillLinkedin size={30} /></a></li> {/* eslint-disable-line */}
                    <li className="mr-3"><a href="https://github.com/Mohamed-Elhawary" target="_blank"><AiFillGithub size={30} /></a></li> {/* eslint-disable-line */}
                    <li className="mr-3"><a href="https://codepen.io/Mohamed-ElHawary" target="_blank"><AiFillCodepenCircle size={30} /></a></li> {/* eslint-disable-line */}
                    <li className="mr-3"><a href="https://www.behance.net/mohamed-elhawary14" target="_blank"><AiFillBehanceCircle size={30} /></a></li> {/* eslint-disable-line */}
                </ul>
            </div>
		</footer>
    );
}

export default Footer;