require 'sinatra'
require 'open-uri'
require 'nokogiri'
require 'json'

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

get '/comments' do
  document = Nokogiri::HTML(open(params[:url]))
  result = []
  document.css('td.default').each do |item|
    comment = {}
    header = item.css('span.comhead').first  
    comment[:id] = header.css('a').last['href'].split('=').last
    
    next if params[:last_id] && comment[:id] <= params[:last_id]
    
    comment[:author] = header.content.split(' ').first
    comment[:time] = header.content.gsub(comment[:author], '').split('|').first.strip
    comment[:body] = item.css('span.comment').first.content
    result << comment
  end
  
  result.to_json
end

