<?php
/*
Plugin Name: Update from Bottom
Plugin URI: http://labs.urre.me
Description: Show two extra buttons (Scroll to top and Publish/Update) in the bottom of the screen when user scrolls near bottom. Suitable for posts and pages with a lot of meta boxes, or when edit.php tends to get very long.
Version: 1.0.1
Author: Urban Sanden
Author URI: http://urre.me
Author Email: hej@urre.me
License: GPL2
*/

/*  Copyright 2104 Urban Sanden (email: hej@urre.me)

    This program is free software; you can redistribute it and/or modify
    it under the terms of the GNU General Public License, version 2, as
    published by the Free Software Foundation.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program; if not, write to the Free Software
    Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA
*/

class UpdatefromBottom {

    function __construct() {

        # Load plugin text domain
        add_action( 'init', array( $this, 'plugin_textdomain' ) );

        # Register admin styles and scripts
        add_action( 'admin_print_styles', array( $this, 'register_admin_styles' ) );
        add_action( 'admin_enqueue_scripts', array( $this, 'register_admin_scripts' ) );

    }

    public function plugin_textdomain() {
        $domain = 'updatefrombottom';
        $locale = apply_filters( 'plugin_locale', get_locale(), $domain );
        load_textdomain( $domain, WP_LANG_DIR.'/'.$domain.'/'.$domain.'-'.$locale.'.mo' );
        load_plugin_textdomain( $domain, FALSE, dirname( plugin_basename( __FILE__ ) ) . '/lang/' );
    }

    public function register_admin_styles() {

		// Where are we?
		$screen = get_current_screen();
		
		// Enqueue style on post ( any post type including custom ) new / edit screens only
        if ( 'post' == $screen->base ) 
            wp_enqueue_style( 'updatefrombottom-plugin-styles', plugins_url( 'update-from-bottom/css/update-from-bottom.admin.css' ) );
    }

    public function register_admin_scripts() {

		// Where are we?
		$screen = get_current_screen();

		// Enqueue script on post ( any post type including custom ) new / edit screens only
        if ( 'post' == $screen->base ) {
			wp_enqueue_script( 'updatefrombottom-admin-script', plugins_url( 'update-from-bottom/js/update-from-bottom.admin.js' ), array('jquery') );

			# Localize strings to js
			$js_data = array(
				'update'     => __( 'Update', 'updatefrombottom' ),
				'publish'    => __( 'Publish', 'updatefrombottom' ),
				'publishing' => __( 'Publishing...', 'updatefrombottom' ),
				'updating'   => __( 'Updating...', 'updatefrombottom' ),
				'totop'      => __( 'To top', 'updatefrombottom' ),
			);

			wp_localize_script('updatefrombottom-admin-script', 'updatefrombottomParams', $js_data);
		}
    }
}

if ( is_admin() )
	$ufb = new UpdatefromBottom();