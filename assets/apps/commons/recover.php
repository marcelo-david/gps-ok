<?php
/**
 *  Recover password traccar  
 */

ini_set("display_errors", 0);

include_once "../conf/conf.php";

class PasswordRecover {
	
	private $url =  'URL';

	private $user_email =  '';
	private $user_pass  =  '';
	
	private $users = array(); 

	private $user_admin = "";
	private $pass_admin = "";
	
	private $user = array();

	/**
     * Whether to throw exceptions for errors.
     * @var boolean
     * @access protected
     */
    protected $exceptions = false;
	
	/**
     * Constructor.
     * @param boolean $exceptions Should we throw external exceptions?
     */
    public function __construct($exceptions = null)
    {
        if ($exceptions !== null) {
            $this->exceptions = (boolean)$exceptions;
        }
    }
	
	public function setAdminAuth($user,$pass) {
		$this->user_admin = $user;
		$this->pass_admin = $pass;	
	}

	public function setUrl($url) {
		$this->url = $url;		
	}
		
	public function setUserMail($mail) {
		$this->user_email = $mail;		
	}
	
	public function setUserPass($pass) {
		$this->user_pass = $pass;		
	}
	
	public function getUser() {
		return $this->user;
	}
	
	/**
 	* List users
 	*/

	public function getUsers() {
		  
		$opts = array('http' =>
		  array(
		    'method'  => 'GET',
		    'header'  => "application/json\r\n".
		      "Authorization: Basic ".base64_encode($this->user_admin.":".$this->pass_admin)."\r\n",
		//    'content' => '{}',
		    'timeout' => 60
		  )
		);		
						
		$context  = stream_context_create($opts);
		$url = $this->url . '/api/users/';

		if (strpos($url, 'http') === false) {
			$url = "http://" . $url;
		}

		$result = file_get_contents($url, false, $context, 0, 40000);
					
		if (strpos($http_response_header[0],'200') !== false) {			
			$this->users = json_decode($result, true);			
		}				
				
		return (count($this->users)==0?false:true);
	
	}

	/**
	 * identify user
	 */


	public function userExists() {
		
		if ($this->getUsers()==true) {			
			for ($i=0; $i<count($this->users);$i++) {		
				if (trim($this->users[$i]["email"]) == trim($this->user_email)) {							
					$this->user = $this->users[$i];		
				} 	
			}
		
		}
	
	 	return (count($this->user)==0?false:true);
	 
	}
	
	public function changePassword() {
	
		if ($this->userExists()==true) {
			
			$this->user["password"] = $this->user_pass;			
			
			$opts = array('http' =>
			  array(
			    'method'  => 'PUT',
			    'header'  => "Content-Type: application/json\r\n".
			      "Authorization: Basic ".base64_encode($this->user_admin.":".$this->pass_admin)."\r\n",
			    "Content-Type: application/json",
			    'content' => json_encode($this->user),
			    'timeout' => 60
			  )
			);		
							
			$context  = stream_context_create($opts);
			$url = $this->url . '/api/users/'.$this->user["id"];

			if (strpos($url, 'http') === false) {
				$url = "http://" . $url;
			}

			$result = file_get_contents($url, false, $context, 0, 40000);
				
			if (strpos($http_response_header[0],'200') !== false) {
				$this->users = json_decode($result);			
			}				
	
		}		
		
		return (count($this->users)==0?false:true);
	
	}
		

}

$option = $_REQUEST["option"];

if ($option == "check") {
	
	$recover = new PasswordRecover;
	
	$recover->setUrl($traccar_host);	
	$recover->setAdminAuth($_SERVER['PHP_AUTH_USER'],$_SERVER['PHP_AUTH_PW']);
	$recover->setUserMail($_GET["email"]);

	if ($recover->userExists()) {
		echo '{"id":"OK"}';
	} else {
		echo '{id:"ERRO"}';
	}
	
}

if ($option == "save") {
	
	$recover = new PasswordRecover;

	$recover->setUrl($traccar_host);
	
	$recover->setAdminAuth($_SERVER['PHP_AUTH_USER'],$_SERVER['PHP_AUTH_PW']);	
	$recover->setUserMail($_POST["email"]);
	$recover->setUserPass($_POST["pass"]);

	if ($recover->changePassword()) {
		echo '{"id":"OK"}';
	} else {
		echo '{id:"ERRO"}';
	}
	
}


