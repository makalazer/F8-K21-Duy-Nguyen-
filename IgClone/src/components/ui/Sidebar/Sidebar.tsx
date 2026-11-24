import { Bookmark, LogOut, Menu, Plus } from 'lucide-react';
import SidebarItem from './SidebarItem';
import { sidebarButton } from '@/utils/Constant';
import {
  Menubar,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from '../menubar';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Field, FieldLabel } from '@/components/ui/field';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import useSidebarAction from '@/components/ui/Sidebar/hooks/useSidebarAction';

function Sidebar() {
  const {
    submitPost,
    logout,
    setCaption,
    setSelectedFile,
    setPreviewURL,
    setFileType,
    setOpenCreatePostDialog,
    handleClearDialogData,
    selectedFile,
    previewURL,
    caption,
    fileType,
    openCreatePostDialog,
  } = useSidebarAction();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const handleCaptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCaption(event.target.value);
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreviewURL(null);
      return;
    }
    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewURL(objectUrl);
    if (selectedFile.type.startsWith('image/')) {
      setFileType('image');
    }
    if (selectedFile.type.startsWith('video/')) {
      setFileType('video');
    }

    return () => URL.revokeObjectURL(objectUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);
  return (
    <aside className='h-screen fixed w-14 hover:w-56 transition-all duration-300 ease-in-out  bg-transparent overflow-hidden group flex flex-col justify-between  z-10  top-0 left-0 '>
      <img
        src='src/assets/instagram-logo-facebook-2-svgrepo-com.svg'
        alt=''
        className='w-14 p-2'
      />
      <nav className='w-full mx-2 flex flex-col gap-4'>
        <Dialog
          open={openCreatePostDialog}
          onOpenChange={() => {
            handleClearDialogData();
            setOpenCreatePostDialog(!openCreatePostDialog);
          }}
        >
          {sidebarButton.map((item, index) => {
            const Icon = item.icon;
            return (
              <SidebarItem
                key={`sidebar-item-${index}`}
                label={item.label}
                link={item.link}
                icon={<Icon />}
              />
            );
          })}
          <DialogTrigger
            render={
              <button className='w-full text-left'>
                <SidebarItem
                  label={'Tạo'}
                  link={''}
                  icon={<Plus size={28} className='shrink-0 ' />}
                />
              </button>
            }
          />
          <DialogContent className='min-w-4xl max-h-[90vh] min-h-[80vh] flex flex-col gap-2 p-0 sm:max-w-4xl'>
            <DialogHeader className='shrink-0 border-b px-6 py-4'>
              <DialogTitle className={'text-center w-full text-xl font-bold'}>
                Bài đăng mới
              </DialogTitle>
            </DialogHeader>
            <div className='flex items-center gap-4 overflow-y-auto justify-between flex-col flex-1 '>
              <Field>
                <FieldLabel
                  htmlFor='caption'
                  className='w-full justify-center text-center py-1 text-lg'
                >
                  Caption
                </FieldLabel>
                <Input
                  id='caption'
                  type='text'
                  placeholder='Enter your caption'
                  onChange={handleCaptionChange}
                  value={caption}
                  className='max-w-4/5 text-center py-4 m-auto'
                />
              </Field>
              <div className='w-4/5 flex justify-end flex-1 flex-col gap-4 '>
                {previewURL && fileType === 'image' && (
                  <img
                    src={previewURL}
                    className='w-full rounded-xl flex-1 max-h-[55vh] object-cover'
                  />
                )}
                {previewURL && fileType === 'video' && (
                  <video
                    src={previewURL}
                    className='w-full rounded-xl flex-1'
                  />
                )}
                <Field>
                  <label
                    htmlFor='picture'
                    className='cursor-pointer bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-lg align-middle text-center'
                  >
                    Chọn ảnh
                    <Input
                      id='picture'
                      type='file'
                      accept='image/*,video/*'
                      className='hidden'
                      onChange={handleFileChange}
                    />
                  </label>
                </Field>
              </div>
            </div>
            <DialogFooter className='shrink-0 border-t p-4 m-0 sm:justify-center'>
              <Button
                className='cursor-pointer bg-gray-800 hover:bg-gray-700 text-white py-3'
                onClick={() => {
                  if (selectedFile && caption) {
                    submitPost({ caption, file: selectedFile });
                    setOpenCreatePostDialog(false);
                    handleClearDialogData();
                  }
                }}
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </nav>
      <Menubar className={'border-0 w-full p-0 pb-2'}>
        <MenubarMenu>
          <MenubarTrigger>
            <Menu
              size={40}
              className='hover:bg-gray-800 w-14 py-2 rounded-xl'
            />
          </MenubarTrigger>
          <MenubarContent className='w-48'>
            <MenubarGroup>
              <MenubarItem className={'text-lg'}>
                <Bookmark size={48} />
                Bài viết đã lưu
              </MenubarItem>
              <MenubarItem
                className={'text-lg text-red-500'}
                onClick={() => {
                  console.log('logout');
                  logout();
                }}
              >
                <LogOut size={48} />
                Đăng xuất
              </MenubarItem>
            </MenubarGroup>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </aside>
  );
}

export default Sidebar;
