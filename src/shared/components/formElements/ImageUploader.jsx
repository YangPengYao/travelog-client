import { useRef, useState, useEffect } from 'react';
import styled from 'styled-components';
import Btn from './Btn';

const ImageUploader = (props) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    let fileIsValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    props.onInput(props.id, pickedFile, fileIsValid);
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  return (
    <div>
      <input
        ref={filePickerRef}
        id='props.id'
        type='file'
        style={{ display: 'none' }}
        accept='.jpg,.jpeg,.png'
        onChange={pickedHandler}
      />
      <ImageUploaderWrapper center={props.center}>
        <Preview>
          {previewUrl && <img src={previewUrl} alt='preview' />}
          {!previewUrl && <p>請挑選一張照片~</p>}
        </Preview>
        <Btn secondary type='button' onClick={pickImageHandler}>
          選擇圖片
        </Btn>
      </ImageUploaderWrapper>
      {!isValid && <ChooseImgText>{props.errorText}</ChooseImgText>}
    </div>
  );
};

const ImageUploaderWrapper = styled.div`
  ${(props) =>
    props.center &&
    `
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`}
`;

const Preview = styled.div`
  width: 13rem;
  height: 13rem;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 1rem;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ChooseImgText = styled.p`
  margin-top: 8px;
  text-align: center;
`;

export default ImageUploader;
