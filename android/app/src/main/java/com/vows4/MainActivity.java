package com.vows4;

import com.facebook.react.ReactActivity;
import com.tkporter.sendsms.SendSMSPackage;
import android.content.Intent; // <-- include if not already there

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        //probably some other stuff here
        super.onActivityResult(requestCode, resultCode, data);
        SendSMSPackage.getInstance().onActivityResult(requestCode, resultCode, data);
    }

        @Override
    protected String getMainComponentName() {
        return "vows4";
    }
}
