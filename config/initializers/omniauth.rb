OmniAuth.config.logger = Rails.logger
 
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :google_oauth2, '344373335572-atpga47kudpel6v1p3ac0e48otahp8lb.apps.googleusercontent.com', '9KEaJ4O8sVBlggu0itj0ZfRo', {client_options: {ssl: {ca_file: Rails.root.join("cacert.pem").to_s}}}
end