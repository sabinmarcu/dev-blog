module Jekyll
  class Site
    alias old_write write
    def write
      old_write
      if `uname`.strip == "Darwin"
        `terminal-notifier -title "#{config['title'] ? config['title'] : 'Jekyll Site'}" -message "Jekyll generate complete."`
      end
    end
  end
end
