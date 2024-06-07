export class ConstantaUtil{
    // Routing
    public static readonly APP_VERSION = '1.2.0'

    // public static readonly API_SERVICE = '/rbac-api-go'
    public static readonly API_SERVICE = '/dev/rbac-api/v1'
    public static readonly API_SERVICE_QC = '/qc/rbac-api/v1'
    public static readonly API_SERVICE_UAT = '/uat/rbac-api/v1'

    // Message
    public static readonly MESSAGE_NO_RESULT = 'Aplikasi sedang dalam masalah. Silahkan Kontak IT Helpdesk.'
    public static readonly APPLICATION_ERROR_TITLE = 'Error';
    public static readonly APPLICATION_ERROR_MESSAGE = 'Aplikasi sedang dalam masalah. Silahkan Kontak IT Helpdesk.';

    // Menu RBAC
    public static readonly MENU_ID_HOME = "6001"
    public static readonly MENU_ID_MASTER_ITEM_CATEGORY = "6002"
    public static readonly MENU_ID_MASTER_ITEM_DISTRIBUSI = "6003"
    public static readonly MENU_ID_MASTER_CATALOG = "6004"
    public static readonly MENU_ID_MASTER_REPORT = "6005"
    public static readonly MENU_ID_MASTER_REPORT_ITEM_DISTRIBUSI = "6006"
    public static readonly MENU_ID_PORTAL_MANAGEMENT = "12"
    public static readonly RESPONSE_CODE_SUCCESS = 200
    public static readonly RESPONSE_CODE_FAILED = 404
    public static readonly RESPONSE_CODE_AUTHORIZED = 401
    public static readonly RESPONSE_CODE_INTERNAL_SERVER_ERROR = 500
    public static readonly RESPONSE_MESSAGE_ERROR_LOGIN = "Login gagal. Mohon periksa Username & Password Anda"

    //SESSION
    public static readonly SM_SESSION_KEY: string = 'sm-session-id'
    public static readonly SM_TIMESTAMP_KEY: string = 'sm-timestamp'
    public static readonly EXPIRED_SESSION: string = 'Session anda telah habis, mohon untuk re-login kembali'
    public static readonly SM_USER_PROFILE: string = 'profile'
    //CODE RESPONSE
    public static readonly GET_SERVICE_SUCCESS = 200

    //ROUTING
    public static readonly ROUTING_LOGIN = 'login'
    public static readonly ROUTING_HOME = 'home'
    public static readonly ROUTING_CATALOG = 'katalog'
    public static readonly ROUTING_MASTER_DATA= 'master-data'
    public static readonly ROUTING_DISTRIBUSI_ITEM= 'distribusi-item'
    public static readonly ROUTING_KATEGORI_ITEM= 'kategori-item'
    public static readonly ROUTING_REPORT = 'report/:menuId'
    public static readonly ROUTING_DETAIL_REPORT = 'detail'

    public static readonly ROUTING_MANAGEMENT_PROCUREMENT = 'management-procurement'
    public static readonly ROUTING_EDIT_FAQ = 'edit-faq'
    public static readonly ROUTING_EDIT_ANNOUNCEMENT = 'edit-announcement'
    public static readonly ROUTING_EDIT_POLICY = 'edit-policy'
    public static readonly ROUTING_EDIT_REGISTRATION_PROCEDURE = 'edit-registration-procedure'
    public static readonly ROUTING_MODUL_PORTAL_MANAGEMENT = 'portal-management'
    public static readonly ROUTING_CHILD_IFRAME = 'page';

    //LOCAL STORAGE
    public static readonly LOCALSTORAGE_MANAGEMENT_INDEX_TAB = 'managementIndexTab'
    public static readonly LOCALSTORAGE_VIEW_MODE = 'view-mode'
    public static readonly LOCALSTORAGE_MANAGEMENT_POLICY_DATA = 'management-policy-data'
    public static readonly LOCALSTORAGE_MANAGEMENT_ANNOUNCEMENT_DATA = 'management-announcement-data'
    public static readonly LOCALSTORAGE_MANAGEMENT_FAQ_DATA = 'management-faq-data'
    public static readonly LOCALSTORAGE_MANAGEMENT_REGISTRATION_PROCEDURE_DATA = 'management-registration-procedure-data'

    //VIEW MODE
    public static readonly MODE_VIEW = 'view'
    public static readonly MODE_EDIT = 'edit'
    public static readonly MODE_ADD = 'add'

    //POPUP
    public static readonly CONFIRMED = 'confirmed'
    public static readonly CHECK_VERIFICATION = 'Pesan Verifikasi'
    public static readonly SUCCESS_NOTIF = 'Success'
    public static readonly CONFIRM_CONFIRMATION = 'Confirmation'
    public static readonly CONFIRM_WARNING = 'Warning'
    public static readonly MESSAGE_CONFIRM_BUTTON = 'Apakah anda yakin?'
    public static readonly MESSAGE_CONFIRM_BUTTON_DELETE = 'Apakah anda yakin akan menghapus data ini?'
    public static readonly MESSAGE_CONFIRM_BUTTON_CANCEL = 'Apakah anda yakin akan cancel input data ini?'
    public static readonly MESSAGE_CONFIRM_BUTTON_SUBMIT = 'Apakah anda yakin akan submit input data ini?'
    public static readonly MESSAGE_CANCEL_PROCESS=`Apakah Anda yakin untuk membatalkan proses {0}?`

    //PARAM_ROUTING
    public static readonly PARAM_ROUTING_KEY = '?q='
    public static readonly PARAM_ROUTING_KEY_ROUTING= 'r'
    public static readonly PARAM_ROUTING_KEY_USER_SESSION= 't'
    public static readonly PARAM_ROUTING_KEY_NIK = 'n'

    //PROTECTED ENDPOINTS (startsWith)
    public static readonly PROTECTED_ENDPOINTS: string[] = [
      'https://www.google.com/',
      'https://www.google.com/',
      'https://www.google.com/'
    ];
}
